/*
 *  lib/to_base64.js
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
const to_base64 = _.promise(self => {
    _.promise.validate(self, to_base64)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.String(document)) {
        document = Buffer.from(document, document_encoding)
    }

    self.document = document.toString("base64")
})

to_base64.method = "to.base64"
to_base64.description = `Encode self.document in base64`
to_base64.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_base64.accepts = {
    document_encoding: _.is.String,
}
to_base64.produces = {
    document: _.is.String,
}
to_base64.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
to_base64.p = _.p(to_base64)

/**
 */
const to_base64_safe = _.promise(self => {
    _.promise.validate(self, to_base64_safe)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.String(document)) {
        document = Buffer.from(document, document_encoding)
    }

    self.document = document
        .toString("base64")
        .replace(/\//g, '_')
        .replace(/[+]/g, '-')
})

to_base64_safe.method = "to.base64.safe"
to_base64_safe.description = `Encode self.document in base64 websafe encoding`
to_base64_safe.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_base64_safe.accepts = {
    document_encoding: _.is.String,
}
to_base64_safe.produces = {
    document: _.is.String,
}
to_base64_safe.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
to_base64_safe.p = _.p(to_base64_safe)

/**
*  API
 */
exports.to_base64 = to_base64
exports.to_base64.safe = to_base64_safe
