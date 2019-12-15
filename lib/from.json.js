/*
 *  lib/from.json.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-12-15
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
    _.promise.validate(self, from_json)

    self.document = JSON.stringify(self.json)
}

const from_json = _.promise(_immediate)
from_json.method = "from.json"
from_json.description = `Decode self.json to self.document`
from_json.requires = {
    json: _.is.JSON,
}
from_json.accepts = {
}
from_json.produces = {
    document: _.is.String,
}
from_json.params = {
    json: _.is.normal,
}
from_json.p = _.p(from_json)
from_json.i = _.i(_immediate)

/**
*  API
 */
exports.from_json = from_json
