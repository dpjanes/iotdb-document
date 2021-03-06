/*
 *  lib/to.hex.js
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
const to_hex = _.promise(self => {
    _.promise.validate(self, to_hex)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.String(document)) {
        document = Buffer.from(document, document_encoding)
    }

    self.document = document.toString("hex")
})

to_hex.method = "to.hex"
to_hex.description = `Encode self.document in hex`
to_hex.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_hex.accepts = {
    document_encoding: _.is.String,
}
to_hex.produces = {
    document: _.is.String,
}
to_hex.params = {
    document: _.p.normal,
    document_encoding: "utf8",
}
to_hex.p = _.p(to_hex)

/**
*  API
 */
exports.to_hex = to_hex
