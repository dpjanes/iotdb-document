/*
 *  lib/identify.quotes.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-10-01
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
const identify_quotes = _.promise(self => {
    _.promise.validate(self, identify_quotes)

    self.parts = []
})
identify_quotes.method = "identify.quotes"
identify_quotes.description = `Identify quotes in plain text`
identify_quotes.requires = {
    document: _.is.String,
}
identify_quotes.accepts = {
    document$cfg: {
        // paragraph_rex: _.is.RegExp,
    },
}
identify_quotes.produces = {
    parts: _.is.Array.of.Dictionary,
}
identify_quotes.params = {
    document: _.p.normal,
}
identify_quotes.p = _.p(identify_quotes)

/**
*  API
 */
exports.identify_quotes = identify_quotes
