var expect = require("chai").expect;

var HTTPBinaryReceiver02 =
  require("../../../lib/bindings/http/receiver_binary_0_2.js");

var receiver = new HTTPBinaryReceiver02();

describe("HTTP Transport Binding Binary Receiver 0.2", () => {
  describe("Check", () => {
    it("Throw error when payload arg is null or undefined", () => {
      // setup
      var payload = null;
      var attributes = {};

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("payload is null or undefined");
    });

    it("Throw error when attributes arg is null or undefined", () => {
      // setup
      var payload = {};
      var attributes = null;

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("attributes is null or undefined");
    });

    it("Throw error when payload is not an object", () => {
      // setup
      var payload = "wow";
      var attributes = {};

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("payload must be an object");
    });

    it("Throw error when headers has no 'ce-type'", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-specversion" : "specversion",
        "ce-source"      : "source",
        "ce-id"          : "id"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("header 'ce-type' not found");
    });

    it("Throw error when headers has no 'ce-specversion'", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-type"        : "type",
        "ce-source"      : "source",
        "ce-id"          : "id"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("header 'ce-specversion' not found");
    });

    it("Throw error when headers has no 'ce-source'", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "specversion",
        "ce-id"          : "id"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("header 'ce-source' not found");
    });

    it("Throw error when headers has no 'ce-id'", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "specversion",
        "ce-source"      : "source"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("header 'ce-id' not found");
    });

    it("Throw error when spec is not 0.2", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "specversion",
        "ce-source"      : "source",
        "ce-id"          : "id"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.throw("invalid spec version");
    });

    it("No error when all required headers are in place", () => {
      // setup
      var payload = {};
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "0.2",
        "ce-source"      : "source",
        "ce-id"          : "id"
      };

      // act and assert
      expect(receiver.check.bind(receiver, payload, attributes))
        .to.not.throw();
    });
  });

  describe("Parse", () => {
    it("Cloudevent contains 'type'", () => {
      // setup
      var payload = {
        "data" : "dataString"
      };
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "0.2",
        "ce-source"      : "source",
        "ce-id"          : "id",
        "ce-time"        : "2019-06-16T11:42:00Z",
        "ce-schemaurl"   : "http://schema.registry/v1"
      };

      // act
      var actual = receiver.parse(payload, attributes);

      // assert
    });

    it("No error when all attributes are in place", () => {
      // setup
      var payload = {
        "data" : "dataString"
      };
      var attributes = {
        "ce-type"        : "type",
        "ce-specversion" : "0.2",
        "ce-source"      : "source",
        "ce-id"          : "id"
      };

      // act
      var actual = receiver.parse(payload, attributes);

      // assert
      expect(actual)
          .to.be.an("object");

    });
  });
});
