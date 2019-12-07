/**
 *  test/to.hex.js
 *
 *  David Janes
 *  IOTDB
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

const assert = require("assert")

const document = require("..")
const _util = require("./_util")

const STRING_EN = "Hello, World. Now is the time for all good men to come to the aid of the party, etc. etc. 效汬Ɐ圠牯摬\n\t-12345677890!@#$%^&*()_+-=\r\n/,.<>;:'{}[]\\|\"~`"
const HEX_EN_UTF8 = Buffer.from(STRING_EN).toString("hex")
const HEX_EN_UTF16LE = Buffer.from(STRING_EN, "utf16le").toString("hex")

describe("to.hex", function() {
    it("works - string in", function(done) {
        _.promise({
            document: STRING_EN,
        })
            .then(document.to.hex)
            .make(sd => {
                const got = sd.document
                const want = HEX_EN_UTF8

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - buffer in", function(done) {
        _.promise({
            document: Buffer.from(STRING_EN),
        })
            .then(document.to.hex)
            .make(sd => {
                const got = sd.document
                const want = HEX_EN_UTF8

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - utf16 buffer in", function(done) {
        _.promise({
            document: Buffer.from(STRING_EN, "utf16le"),
        })
            .then(document.to.hex)
            .make(sd => {
                const got = sd.document
                const want = HEX_EN_UTF16LE

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})
