/*
 *  lib/from_hex.js
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
const from_hex = _.promise(self => {
    _.promise.validate(self, from_hex)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.Buffer(document)) {
        document = document.toString(document_encoding)
    }

    self.document = Buffer.from(document, "hex")
})

from_hex.method = "from.hex"
from_hex.description = `Decode self.document that is encoded in hex.`
from_hex.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
from_hex.accepts = {
    document_encoding: _.is.String,
}
from_hex.produces = {
    document: _.is.Buffer,
}
from_hex.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
from_hex.p = _.p(from_hex)

/**
*  API
 */
exports.from_hex = from_hex
