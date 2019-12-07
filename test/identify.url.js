/**
 *  test/identify.url.js
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

describe("identify.url", function() {
    const tests = [
        {
            url: "http://david.com/name.pdf",
            document_media_type: "application/pdf",
        },
        {
            url: "http://david.com//home/david/name.pdf",
            document_media_type: "application/pdf",
        },
        {
            url: "http://david.com/name.text",
            document_media_type: "text/plain",
        },
        {
            url: "file:///name.txt",
            document_media_type: "text/plain",
        },
        {
            url: "http://david.com/image.png#hash",
            document_media_type: "image/png",
        },
        {
            url: "http://david.com//something/something/kittens.jpg?jdkdk#djkdkd",
            document_media_type: "image/jpeg",
        },
        {
            url: "http://david.com/car.gif?a=1&b=2",
            document_media_type: "image/gif",
        },
    ]

    const _test = _.promise((self, done) => {
        _.promise(self)
            .add("test/url")
            .then(document.identify.url)
            .make(sd => {
                assert.strictEqual(sd.document_media_type, sd.test.document_media_type)
            })
            .end(done)
    })

    it("works", function(done) {
        _.promise({
            tests: tests,
        })
            .each({
                method: _test,
                inputs: "tests:test",
            })
            .end(done)
    })
    it("immediate", function() {
        tests.forEach(test => {
            const result = document.identify.url.i(test)

            assert.strictEqual(result.document_media_type, test.document_media_type)
        })
    })
    it("parameterized", function(done) {
        _.promise()
            .then(document.identify.url.p("http://david/file.jpg"))
            .make(sd => {
                const got = sd.document_media_type
                const want = "image/jpeg"

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})
