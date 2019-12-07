/**
 *  test/to.string.js
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

const STRING_EN = "Hello, World"
const BUFFER_UTF8 = Buffer.from(STRING_EN, "utf8")
const BUFFER_UTF16LE = Buffer.from(STRING_EN, "utf16le")

describe("to.string", function() {
    it("works - string in", function(done) {
        _.promise({
            document: STRING_EN,
        })
            .then(document.to.string)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - string in, encoding does nothing", function(done) {
        _.promise({
            document: STRING_EN,
            document_encoding: "utf16le",
        })
            .then(document.to.string)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - buffer in, default encoding", function(done) {
        _.promise({
            document: BUFFER_UTF8,
        })
            .then(document.to.string)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("works - buffer in, explicit encoding", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
            document_encoding: "utf16le",
        })
            .then(document.to.string)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("expected mismatch - buffer in, explicit encoding", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
        })
            .then(document.to.string)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.ok(got !== want)
            })
            .end(done)
    })
    it("parameterized - all arguments", function(done) {
        _.promise({
            // document: BUFFER_UTF16LE,
            // document_encoding: "utf16le",
        })
            .then(document.to.string.p(BUFFER_UTF16LE, "utf16le"))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("parameterized - default first argument", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
            // document_encoding: "utf16le",
        })
            .then(document.to.string.p(null, "utf16le"))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("parameterized - default all arguments (1)", function(done) {
        _.promise({
            document: BUFFER_UTF8,
            document_encoding: null,
        })
            .then(document.to.string.p(null, null))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("parameterized - default all arguments (2)", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
            document_encoding: "utf16le",
        })
            .then(document.to.string.p(null, null))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})

describe("to.string.utf8", function() {
    it("works - buffer in", function(done) {
        _.promise({
            document: BUFFER_UTF8,
        })
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("expected mismatch - buffer in, explicit encoding", function(done) {
        _.promise({
            document: BUFFER_UTF16LE,
        })
            .then(document.to.string.utf8)
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.ok(got !== want)
            })
            .end(done)
    })
    it("parameterized - all arguments", function(done) {
        _.promise({
            // document: BUFFER_UTF8,
        })
            .then(document.to.string.utf8.p(BUFFER_UTF8))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
    it("parameterized - default first argument", function(done) {
        _.promise({
            document: BUFFER_UTF8,
        })
            .then(document.to.string.utf8.p(null))
            .make(sd => {
                const got = sd.document
                const want = STRING_EN

                assert.deepEqual(got, want)
            })
            .end(done)
    })
})
