/*
 *  lib/index.js
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

module.exports = {
    to: {
        string: require("./to.string").to_string,
        buffer: require("./to.buffer").to_buffer,
        base64: require("./to.base64").to_base64,
        hex: require("./to.hex").to_hex,
        json: require("./to.json").to_json,
    },
    from: {
        json: require("./from.json").from_json,
        yaml: require("./from.yaml").from_yaml,
        hex: require("./from.hex").from_hex,
        base64: require("./from.base64").from_base64,
    },
    identify: {
        path: require("./identify.path").identify_path,
        url: require("./identify.url").identify_url,
        paragraphs: require("./identify.paragraphs").identify_paragraphs,
        quotes: require("./identify.quotes").identify_quotes,
        sentences: require("./identify.sentences").identify_sentences,
    },
}
