/*
 *  lib/identify.paragraphs.js
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

/**
 */
const identify_paragraphs = _.promise(self => {
    _.promise.validate(self, identify_paragraphs)

    self.document$cfg = self.document$cfg || {}
    self.document$cfg.paragraph_rex = new RegExp("\n\n+", "m")

    self.parts = []
})
identify_paragraphs.method = "identify.paragraphs"
identify_paragraphs.description = `Identify paragraphs in plain text`
identify_paragraphs.requires = {
    document: _.is.String,
}
identify_paragraphs.accepts = {
    document$cfg: {
        paragraph_rex: [ _.is.RegExp, _.is.Function ],
    },
}
identify_paragraphs.produces = {
    parts: _.is.Array.of.Dictionary,
}
identify_paragraphs.params = {
    document: _.p.normal,
}
identify_paragraphs.p = _.p(identify_paragraphs)

/**
*  API
 */
exports.identify_paragraphs = identify_paragraphs
