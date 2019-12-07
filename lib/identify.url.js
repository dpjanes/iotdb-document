/*
 *  lib/identify.url.js
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

const URL = require("url").URL
const mime = require("mime")

/**
 */
const _immediate = self => {
    _.promise.validate(self, identify_url)

    const url = new URL(self.url)
    self.document_media_type = mime.getType(url.pathname) || "application/octet-stream"
}

_immediate.method = "identify.url.i"

const identify_url = _.promise(_immediate)
identify_url.method = "identify.url"
identify_url.description = `Figure out what MIME type of self.url is`
identify_url.requires = {
    url: _.is.String,
}
identify_url.accepts = {
}
identify_url.produces = {
    document_media_type: _.is.String,
}
identify_url.params = {
    url: _.is.normal,
}
identify_url.p = _.p(identify_url)
identify_url.i = _.i(_immediate)

/**
*  API
 */
exports.identify_url = identify_url
