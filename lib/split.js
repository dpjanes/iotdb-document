/*
 *  lib/split.paragraphs.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-10-01
 *
 *  Copyright (2013-2020) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")
const errors = require("iotdb-errors")

/**
 */
const _split_sentences = _.promise(self => {
    const ss = require("sentence-splitter")

    self.parts = _.flatten(self.document
        .split(/\n\n+/)
        .map(part => ss.split(part)
            .filter(d => d.type === "Sentence")
            .map(d => ({
                document: d.raw,
                token: "sentence",
                start: d.range[0],
                end: d.range[1],
            }))
        ))
})

/**
 */
const _split_paragraphs = _.promise(self => {
    const rex = /\n\n+/mg
    let match
    let current = 0

    while (match = rex.exec(self.document)) {
        if (match.index === 0) {
            return
        }

        self.parts.push({
            document: self.document.substring(current, match.index),
            token: "paragraph",
            start: current,
            end: match.index,
        })

        current = match.index + 2
    }
})

/**
 */
const _split = (_splitter, _token) => {
    const f = _.promise((self, done) => {
        _splitter = _.d.first(self, "/document$cfg/splitter") || _splitter

        _.promise(self)
            .validate(f)

            .add("parts", [])
            .then(_splitter)

            .end(done, self, f)
    })

    f.method = `split.${_token}s`
    f.description = ``
    f.requires = {
        document: _.is.String,
    }
    f.accepts = {
        document$cfg: {
            splitter: _.is.Function,
            token: _.is.String,
        },
    }
    f.produces = {
        parts: _.is.Array.of.Dictionary,
    }
    f.params = {
        document: _.p.normal,
    }
    f.p = _.p(f)

    return f
}

/**
 *  API
 */
exports.paragraphs = _split(_split_paragraphs, "paragraph")
exports.sentences = _split(_split_sentences, "sentence")
