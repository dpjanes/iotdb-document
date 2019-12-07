/*
 *  lib/to.buffer.js
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

/**
 */
const to_buffer = _.promise(self => {
    _.promise.validate(self, to_buffer)

    let document_encoding = self.document_encoding || "utf8"

    if (_.is.String(self.document)) {
        self.document = Buffer.from(self.document, document_encoding)
    }
})

to_buffer.method = "to.buffer"
to_buffer.description = `Ensure self.document is a Buffer`
to_buffer.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_buffer.accepts = {
    document_encoding: _.is.String,
}
to_buffer.produces = {
    document: _.is.Buffer,
}
to_buffer.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
to_buffer.p = _.p(to_buffer)

/**
 */
const to_utf8 = _.promise(self => {
    _.promise.validate(self, to_utf8)

    if (_.is.String(self.document)) {
        self.document = Buffer.from(self.document, "utf8")
    }
})

to_utf8.method = "to.buffer.utf8"
to_utf8.description = `Ensure self.document is a Buffer, encoding is UTF-8`
to_utf8.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_utf8.accepts = {
}
to_utf8.produces = {
    document: _.is.Buffer,
}
to_utf8.params = {
    document: _.is.normal,
}
to_utf8.p = _.p(to_utf8)

/**
 *  API
 */
exports.to_buffer = to_buffer
exports.to_buffer.utf8 = to_utf8
