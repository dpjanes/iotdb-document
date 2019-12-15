/**
 *  test/from.json.js
 *
 *  David Janes
 *  IOTDB
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

const assert = require("assert")

const document = require("..")
const _util = require("./_util")

const J = { a: 1, b: [ "a", "b", ] }
const STRING = JSON.stringify(J)
const PRETTY = JSON.stringify(J, null, 2)

describe("from.json", function() {
    it("works", function(done) {
        _.promise({
            json: J,
        })
            .then(document.from.json)
            .make(sd => {
                const got = sd.document
                const want = STRING

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - parameterized", function(done) {
        _.promise()
            .then(document.from.json.p(J))
            .make(sd => {
                const got = sd.document
                const want = STRING

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})

describe("from.json.pretty", function() {
    it("works", function(done) {
        _.promise({
            json: J,
        })
            .then(document.from.json.pretty)
            .make(sd => {
                const got = sd.document
                const want = PRETTY

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - parameterized", function(done) {
        _.promise()
            .then(document.from.json.pretty.p(J))
            .make(sd => {
                const got = sd.document
                const want = PRETTY

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})
