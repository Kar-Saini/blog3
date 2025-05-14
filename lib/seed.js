"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var data_1 = require("../data/data");
var prisma = new client_1.PrismaClient();
var users = [
    {
        name: "Alex Rivera",
        civicProvidedPublicKey: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
        name: "Maya Johnson",
        civicProvidedPublicKey: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    },
    {
        name: "Jaime Chen",
        civicProvidedPublicKey: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    },
    {
        name: "Alice Smith",
        civicProvidedPublicKey: "0x1A1B1C1D1E1F1A1B1C1D1E1F1A1B1C1D1E1F1A1B",
    },
    {
        name: "Bob Johnson",
        civicProvidedPublicKey: "0x2A2B2C2D2E2F2A2B2C2D2E2F2A2B2C2D2E2F2A2B",
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var createdUsers, _loop_1, _i, sampleBlogs_1, blogData, alex, maya, alice, bob, blog1, blog2, blog3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Start seeding ...");
                    return [4 /*yield*/, Promise.all(users.map(function (user) {
                            return prisma.user.create({
                                data: user,
                            });
                        }))];
                case 1:
                    createdUsers = _a.sent();
                    console.log("Created ".concat(createdUsers.length, " users."));
                    _loop_1 = function (blogData) {
                        var author, blog;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    author = createdUsers.find(function (user) { return user.civicProvidedPublicKey === blogData.author.walletAddress; });
                                    if (!author) {
                                        console.warn("Author with wallet address ".concat(blogData.author.walletAddress, " not found. Skipping blog \"").concat(blogData.title, "\"."));
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, prisma.blog.create({
                                            data: {
                                                id: blogData.id,
                                                title: blogData.title,
                                                imageUrl: blogData.imageUrl,
                                                excerpt: blogData.excerpt,
                                                content: blogData.content,
                                                tags: blogData.tags.join(","), // Store tags as a comma-separated string
                                                isPremium: blogData.isPremium,
                                                blogOwnerId: author.id,
                                            },
                                        })];
                                case 1:
                                    blog = _b.sent();
                                    console.log("Created blog with id: ".concat(blog.id));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, sampleBlogs_1 = data_1.sampleBlogs;
                    _a.label = 2;
                case 2:
                    if (!(_i < sampleBlogs_1.length)) return [3 /*break*/, 5];
                    blogData = sampleBlogs_1[_i];
                    return [5 /*yield**/, _loop_1(blogData)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    alex = createdUsers.find(function (user) { return user.name === "Alex Rivera"; });
                    maya = createdUsers.find(function (user) { return user.name === "Maya Johnson"; });
                    alice = createdUsers.find(function (user) { return user.name === "Alice Smith"; });
                    bob = createdUsers.find(function (user) { return user.name === "Bob Johnson"; });
                    return [4 /*yield*/, prisma.blog.findUnique({ where: { id: "1" } })];
                case 6:
                    blog1 = _a.sent();
                    return [4 /*yield*/, prisma.blog.findUnique({ where: { id: "2" } })];
                case 7:
                    blog2 = _a.sent();
                    return [4 /*yield*/, prisma.blog.findUnique({ where: { id: "3" } })];
                case 8:
                    blog3 = _a.sent();
                    if (!(blog1 && alice)) return [3 /*break*/, 10];
                    return [4 /*yield*/, prisma.like.create({
                            data: {
                                blogId: blog1.id,
                                userId: alice.id,
                            },
                        })];
                case 9:
                    _a.sent();
                    console.log("Alice liked blog ".concat(blog1.id));
                    _a.label = 10;
                case 10:
                    if (!(blog1 && bob)) return [3 /*break*/, 12];
                    return [4 /*yield*/, prisma.like.create({
                            data: {
                                blogId: blog1.id,
                                userId: bob.id,
                            },
                        })];
                case 11:
                    _a.sent();
                    console.log("Bob liked blog ".concat(blog1.id));
                    _a.label = 12;
                case 12:
                    if (!(blog2 && alex)) return [3 /*break*/, 14];
                    return [4 /*yield*/, prisma.like.create({
                            data: {
                                blogId: blog2.id,
                                userId: alex.id,
                            },
                        })];
                case 13:
                    _a.sent();
                    console.log("Alex liked blog ".concat(blog2.id));
                    _a.label = 14;
                case 14:
                    if (!(blog3 && maya)) return [3 /*break*/, 16];
                    return [4 /*yield*/, prisma.like.create({
                            data: {
                                blogId: blog3.id,
                                userId: maya.id,
                            },
                        })];
                case 15:
                    _a.sent();
                    console.log("Maya liked blog ".concat(blog3.id));
                    _a.label = 16;
                case 16:
                    if (!(blog1 && alice)) return [3 /*break*/, 18];
                    return [4 /*yield*/, prisma.tip.create({
                            data: {
                                blogId: blog1.id,
                                fromAddress: alice.civicProvidedPublicKey,
                                amount: 1000000, // Example amount in smallest unit (e.g., lamports for Solana)
                                initiatedByUserId: alice.id,
                            },
                        })];
                case 17:
                    _a.sent();
                    console.log("Alice tipped blog ".concat(blog1.id));
                    _a.label = 18;
                case 18:
                    if (!(blog2 && bob)) return [3 /*break*/, 20];
                    return [4 /*yield*/, prisma.tip.create({
                            data: {
                                blogId: blog2.id,
                                fromAddress: bob.civicProvidedPublicKey,
                                amount: 500000,
                                initiatedByUserId: bob.id,
                            },
                        })];
                case 19:
                    _a.sent();
                    console.log("Bob tipped blog ".concat(blog2.id));
                    _a.label = 20;
                case 20:
                    if (!(blog3 && alex)) return [3 /*break*/, 22];
                    return [4 /*yield*/, prisma.tip.create({
                            data: {
                                blogId: blog3.id,
                                fromAddress: alex.civicProvidedPublicKey,
                                amount: 2000000,
                                initiatedByUserId: alex.id,
                            },
                        })];
                case 21:
                    _a.sent();
                    console.log("Alex tipped blog ".concat(blog3.id));
                    _a.label = 22;
                case 22:
                    if (!(alice && alex && blog1)) return [3 /*break*/, 24];
                    return [4 /*yield*/, prisma.transaction.create({
                            data: {
                                fromAddress: alice.civicProvidedPublicKey,
                                toAddress: alex.civicProvidedPublicKey, // Assuming tip goes to author
                                amount: 1000000,
                                initiatedByUserId: alice.id,
                                txSignature: "sample-tx-signature-1",
                            },
                        })];
                case 23:
                    _a.sent();
                    console.log("Created transaction for tip from Alice to Alex");
                    _a.label = 24;
                case 24:
                    if (!(bob && maya && blog2)) return [3 /*break*/, 26];
                    return [4 /*yield*/, prisma.transaction.create({
                            data: {
                                fromAddress: bob.civicProvidedPublicKey,
                                toAddress: maya.civicProvidedPublicKey,
                                amount: 500000,
                                initiatedByUserId: bob.id,
                                txSignature: "sample-tx-signature-2",
                            },
                        })];
                case 25:
                    _a.sent();
                    console.log("Created transaction for tip from Bob to Maya");
                    _a.label = 26;
                case 26:
                    if (!(alice && blog3)) return [3 /*break*/, 28];
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: alice.id },
                            data: {
                                purchasedBlogs: {
                                    connect: { id: blog3.id },
                                },
                            },
                        })];
                case 27:
                    _a.sent();
                    console.log("Alice purchased blog ".concat(blog3.id));
                    _a.label = 28;
                case 28:
                    console.log("Seeding finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
