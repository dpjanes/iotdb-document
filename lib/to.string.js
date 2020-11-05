/*
 *  lib/to.string.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-12-06
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

let _once = false

// https://github.com/nodejs/node/blob/master/lib/buffer.js
const knowns = [
    'ascii',
    'base64',
    'binary',
    'hex',
    'latin1',
    'ucs-2',
    'ucs2',
    'utf-16le',
    'utf-8',
    'utf16le',
    'utf8',
]

/**
 */
const _immediate = self => {
    _.promise.validate(self, to_string)

    let document_encoding = self.document_encoding || "utf8"

    if (!_.is.Buffer(self.document)) {
        return
    }

    if (knowns.indexOf(document_encoding) > -1) {
        self.document = self.document.toString(document_encoding)
        return
    }

    let iconv
    try {
        iconv = require("iconv")
        try {
            iconv = require("iconv-lite")
        } catch (x) {
            if (_once) {
                return
            }

            logger.warn({
                method: tokenize_sentences.method,
                module_name: "iconv or iconv-lite",
            }, "optional module needs to be installed to use this method")

            _once = true

            throw x
        }
    }

    const converter = new iconv.Iconv(document_encoding, "utf8")
    self.document = converter.convert(self.document).toString("utf8")
}

_immediate.method = "to.string.i"

const to_string = _.promise(_immediate)
to_string.method = "to.string"
to_string.description = `Ensure self.document is a String`
to_string.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_string.accepts = {
    document_encoding: _.is.String,
}
to_string.produces = {
    document: _.is.String,
}
to_string.params = {
    document: _.p.normal,
    document_encoding: "utf8",
}
to_string.p = _.p(to_string)
to_string.i = _.i(_immediate)

/**
 */
const to_utf8 = _.promise(self => {
    _.promise.validate(self, to_utf8)

    if (_.is.Buffer(self.document)) {
        self.document = self.document.toString("utf8")
    }
})

to_utf8.method = "to.string.utf8"
to_utf8.description = `Ensure self.document is a String (encoding is UTF-8)`
to_utf8.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_utf8.accepts = {
}
to_utf8.produces = {
    document: _.is.String,
}
to_utf8.params = {
    document: _.p.normal,
}
to_utf8.p = _.p(to_string)

/**
*  API
 */
exports.to_string = to_string
exports.to_string.utf8 = to_utf8
