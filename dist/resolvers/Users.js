"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Users_1 = require("../entities/Users");
const user_input_1 = require("./types/user-input");
const bcrypt = __importStar(require("bcrypt"));
const Password_1 = require("../entities/Password");
const apollo_server_express_1 = require("apollo-server-express");
let UserResolver = class UserResolver {
    returnSingleUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Users_1.UserModel.findById({ _id: id });
        });
    }
    returnAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Users_1.UserModel.find();
        });
    }
    createUser({ username, email, firstName, lastName, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email === undefined) {
                throw new apollo_server_express_1.UserInputError("Form Arguments invalid", {
                    invalidArgs: Object.keys(['email']),
                });
            }
            const user = (yield Users_1.UserModel.create({
                username,
                email,
                firstName,
                lastName,
            })).save();
            (yield Password_1.PasswordModel.create({
                passwordHash: yield bcrypt.hash(password, Number.parseInt(process.env.HASH_SALT_ROUNDS)),
                email: email,
            })).save();
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Users_1.UserModel.deleteOne({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query((_returns) => Users_1.User, { nullable: false }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "returnSingleUser", null);
__decorate([
    type_graphql_1.Query(() => [Users_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "returnAllUsers", null);
__decorate([
    type_graphql_1.Mutation(() => Users_1.User),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=Users.js.map