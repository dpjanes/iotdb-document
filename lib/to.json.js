/*
 *  lib/to.json.js
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
const _immediate = self => {
    _.promise.validate(self, to_json)

    let document = self.document
    let document_encoding = self.document_encoding || "utf8"

    if (_.is.Buffer(document)) {
        document = document.toString(document_encoding)
    }

    self.json = JSON.parse(document)
}

_immediate.method = "to.json.i"

const to_json = _.promise(_immediate)
to_json.method = "to.json"
to_json.description = `Decode self.document as a JSON document`
to_json.requires = {
    document: [ _.is.Buffer, _.is.String ],
}
to_json.accepts = {
    document_encoding: _.is.String,
}
to_json.produces = {
    json: _.is.JSON,
}
to_json.params = {
    document: _.is.normal,
    document_encoding: "utf8",
}
to_json.p = _.p(to_json)
to_json.i = _.i(_immediate)

/**
*  API
 */
exports.to_json = to_json
