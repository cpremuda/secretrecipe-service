var chai        = require('chai');
var expect      = require("chai").expect;
var sinon       = require('sinon');
var sinonChai   = require('sinon-chai');
var merge = require('../../../util/objectMerge');

chai.use(sinonChai);

describe('One level object', function () {
    var obj1 = {
        "string" : "s",
        "boolean" : true,
        "notInObj2" : "foo",
        "regex" : /^\d$/,
        "array" : [1,2,3]
    };
    var obj2 = {
        "string" : "sss",
        "boolean" : false,
        "regex" : /^\d\d\d$/,
        "array" : [4,5]
    };

    var obj3 = merge(obj1, obj2, true);
    it('should override string', function () {
        expect(obj3.string).to.equal("sss")
    });
    it('should override boolean', function () {
        expect(obj3.boolean).to.equal(false)
    })
    it('should not override missing value', function () {
        expect(obj3.notInObj2).to.equal("foo")
    });
    it('should override regex', function () {
        expect(obj3.regex).to.deep.equal(/^\d\d\d$/)
    })
    it('should override array', function () {
        expect(obj3.array).to.deep.equal([4,5])
    })
});

describe('Merge arrays', function () {
    var obj1 = {
        "array" : [1,2,3]
    };
    var obj2 = {
        "array" : [4,5]
    };
    var obj3 = {
        "array" : "foo"
    };

    var obj4 = merge(obj1, obj2);
    var obj5 = merge(obj1, obj3);

    it('should merge array', function () {
        expect(obj4.array).to.deep.equal([4,5,1,2,3])
    })
    it('should override array because second array is a string', function () {
        expect(obj5.array).to.equal("foo")
    })
});

describe('Deep level object', function () {
    var obj1 = {
        "obj" : {
            "foo" : {
                "bar" : {
                    "string" : "s",
                    "boolean" : true,
                    "notInObj2" : "foo",
                    "regex" : /^\d$/,
                    "array" : [1,2,3]
                }
            }
        }
    };
    var obj2 = {
        "obj" : {
            "foo" : {
                "bar" : {
                    "string" : "sss",
                    "boolean" : false,
                    "regex" : /^\d\d\d$/,
                    "array" : [4,5]
                }
            },
            "bar" : "newValue"
        }
    };

    var obj3 = merge(obj1, obj2, true);
    it('should override string', function () {
        expect(obj3.obj.foo.bar.string).to.equal("sss")
    });
    it('should override boolean', function () {
        expect(obj3.obj.foo.bar.boolean).to.equal(false)
    })
    it('should not override missing value', function () {
        expect(obj3.obj.foo.bar.notInObj2).to.equal("foo")
    });
    it('should override regex', function () {
        expect(obj3.obj.foo.bar.regex).to.deep.equal(/^\d\d\d$/)
    })
    it('should override array', function () {
        expect(obj3.obj.foo.bar.array).to.deep.equal([4,5])
    })
    it('should have a new value', function () {
        expect(obj3.obj.bar).to.equal("newValue")
    })
});

