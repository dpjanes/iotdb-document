/**
 *  test/to.jsonx.js
 *
 *  David Janes
 *  IOTDB
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

const assert = require("assert")

const document = require("..")
const _util = require("./_util")

const J = { a: 1, b: [ "a", "b", ] }
const STRING = JSON.stringify(J)
const BUFFER_UTF8 = Buffer.from(STRING)
const BUFFER_UTF16LE = Buffer.from(STRING, "utf16le")

describe("to.json", function() {
    it("works - string in", function(done) {
        _.promise({
            document: STRING,
        })
            .then(document.to.json)
            .make(sd => {
                const got = sd.json
                const want = J

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - buffer", function(done) {
        _.promise({
            document: BUFFER_UTF8,
        })
            .then(document.to.json)
            .make(sd => {
                const got = sd.json
                const want = J

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - buffer (utf16le)", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
            document_encoding: "utf16le",
        })
            .then(document.to.json)
            .make(sd => {
                const got = sd.json
                const want = J

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - paramaterized", function(done) {
        _.promise()
            .then(document.to.json.p(BUFFER_UTF16LE, "utf16le"))
            .make(sd => {
                const got = sd.json
                const want = J

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - immediate", function() {
        const ind = {
            document: BUFFER_UTF16LE,
            document_encoding: "utf16le",
        }
        const out = document.to.json.i(ind)

        assert.deepEqual(out.json, J)
        assert.ok(_.is.Undefined(ind.json))
    })
})
