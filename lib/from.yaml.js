/*
 *  lib/from.yaml.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-03-31
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
const _from_yaml = self => {
    _.promise.validate(self, from_yaml)

    const yaml = require("js-yaml")

    self.document = yaml.safeDump(self.json, self.document$cfg || {
        sortKeys: false,
    })
}

const from_yaml = _.promise(_from_yaml)
from_yaml.method = "from.json"
from_yaml.description = `Decode self.json to self.document, YAML formatted

    Yes, the name is confusing but it's basically "from json, formatted as YAML"
`
from_yaml.requires = {
    json: _.is.JSON,
}
from_yaml.accepts = {
    document$cfg: _.is.Dictionary,
}
from_yaml.produces = {
    document: _.is.String,
}
from_yaml.params = {
    json: _.is.normal,
}
from_yaml.p = _.p(from_yaml)
from_yaml.i = _.i(_from_yaml)

/**
*  API
 */
exports.from_yaml = from_yaml
