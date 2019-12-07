/**
 *  test/from_hex.js
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
const HEX_EN_UTF16LE = Buffer.from(STRING_EN).toString("hex").toString("utf16le")

describe("from.hex", function() {
    it("works - buffer in (utf8 default)", function(done) {
        _.promise({
            document: Buffer.from(HEX_EN_UTF8),
        })
            .then(document.from.hex)
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                // console.log(JSON.stringify({ got, want }))
                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - string in (utf8 default)", function(done) {
        _.promise({
            document: HEX_EN_UTF8,
        })
            .then(document.from.hex)
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - paramaterized all arguments (utf8)", function(done) {
        _.promise()
            .then(document.from.hex.p(HEX_EN_UTF8, "utf8"))
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - paramaterized all arguments (utf16le)", function(done) {
        _.promise()
            .then(document.from.hex.p(HEX_EN_UTF16LE, "utf16le"))
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                // console.log(JSON.stringify({ got, want }))
                assert.deepEqual(got, want)
            })
            .end(done)
    })
})
