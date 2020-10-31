/*
 *  lib/identify.encoding.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-12-07
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

let _once

/**
 */
const _immediate = self => {
    _.promise.validate(self, identify_encoding)

    if (_.is.Buffer(self.document)) {
        let detectCharacterEncoding
        try {
            detectCharacterEncoding = require("detect-character-encoding")
        } catch (x) {
            if (_once) {
                return
            }

            logger.warn({
                method: tokenize_sentences.method,
                module_name: "detect-character-encoding",
            }, "optional module needs to be installed to use this method")

            _once = true

            throw x
        }

        self.document_encoding = detectCharacterEncoding(self.document).encoding.toLowerCase();
    } else {
        self.document_encoding = self.document_encoding || "utf-8"
    }
}

_immediate.method = "identify.encoding.i"

const identify_encoding = _.promise(_immediate)
identify_encoding.method = "identify.encoding"
identify_encoding.description = `Figure out what the document encoding is

    Requires installed detect-character-encoding
`
identify_encoding.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
identify_encoding.accepts = {
}
identify_encoding.produces = {
    document_encoding: _.is.String,
}
identify_encoding.params = {
    document: _.p.normal,
}
identify_encoding.p = _.p(identify_encoding)
identify_encoding.i = _.i(_immediate)

/**
*  API
 */
exports.identify_encoding = identify_encoding
