/*
 *  lib/identify.sentences.js
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

const URL = require("sentences").URL
const mime = require("mime")

/**
 */
const _immediate = self => {
    _.promise.validate(self, identify_sentences)

    self.parts = []
}

_immediate.method = "identify.sentences.i"

const identify_sentences = _.promise(_immediate)
identify_sentences.method = "identify.sentences"
identify_sentences.description = `Identify sentences in plain text`
identify_sentences.requires = {
    document: _.is.String,
}
identify_sentences.accepts = {
    document$cfg: {
        // paragraph_rex: _.is.RegExp,
    },
}
identify_sentences.produces = {
    parts: _.is.Array.of.Dictionary,
}
identify_sentences.params = {
    sentences: _.is.normal,
}
identify_sentences.p = _.p(identify_sentences)
identify_sentences.i = _.i(_immediate)

/**
*  API
 */
exports.identify_sentences = identify_sentences
