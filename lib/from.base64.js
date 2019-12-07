/*
 *  lib/from.base64.js
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

/**
 */
const from_base64 = _.promise(self => {
    _.promise.validate(self, from_base64)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.Buffer(document)) {
        document = document.toString(document_encoding)
    }

    document = document
        .replace(/_/g, "\/")
        .replace(/-/g, "+")

    self.document = Buffer.from(document, "base64")
})

from_base64.method = "from.base64"
from_base64.description = `Decode self.document encoded in base64.
    
    This will also work with Safe Base64 encodings.
    If the document is a Buffer, document_encoding will be used`
from_base64.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
from_base64.accepts = {
    document_encoding: _.is.String,
}
from_base64.produces = {
    document: _.is.Buffer,
}
from_base64.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
from_base64.p = _.p(from_base64)

/**
*  API
 */
exports.from_base64 = from_base64
