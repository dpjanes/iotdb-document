# iotdb-document
POP Document wrapper

## Samples

Ensure document is a Buffer. Default encoding is utf-8

    _.promise({
        document: "Hello, World",
    })
        .then(document.to.buffer)

... take no chances ...

    _.promise({
        document: "Hello, World",
    })
        .then(document.to.buffer.utf8)

Ensure document is a Buffer, encoded in utf-16

    _.promise({
        document: "Hello, World",
        document_encoding: "utf-16",
    })
        .then(document.to.buffer)

Ensure document is a String. Default encoding is utf-8

    _.promise({
        document: Buffer.from("Hello, World", "utf-8"),
    })
        .then(document.to.string)

... take no chances ...

    _.promise({
        document: Buffer.from("Hello, World", "utf-8"),
    })
        .then(document.to.string.utf8)

Ensure document is a String, decoding from utf-16

    _.promise({
        document: Buffer.from("Hello, World"),
        document_encoding: "utf-16",
    })
        .then(document.to.string)

Convert from/to Hex, Base64 and Safe Base64 encodings

        .then(document.to.hex)
        .then(document.from.hex)

        .then(document.to.base64)
        .then(document.from.base64)

        .then(document.to.base64.safe)
        .then(document.from.base64.safe)

Identify MIME types

        .then(document.identify.path)
        .then(document.identify.url)

More ideas

    document.from.json
    document.to.json

More ideas (for document\_media\_type)

        document.identify.document
        document.is(mime_type)
        document.is.text
        document.is.json
        ...
