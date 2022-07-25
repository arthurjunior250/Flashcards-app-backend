"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardMutation = exports.CardQuery = exports.Card = void 0;
const nexus_1 = require("nexus");
exports.Card = (0, nexus_1.objectType)({
    name: "Card",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("question");
        t.nonNull.string('description');
        t.nonNull.string("answer");
    }
});
exports.CardQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field("allCards", {
            type: 'Card',
            resolve(parent, args, context, info) {
                return context.prisma.card.findMany();
            }
        }),
            t.field('oneCard', {
                type: "Card",
                args: {
                    id: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
                },
                resolve(parent, args, context) {
                    return context.prisma.card.findUnique({
                        where: {
                            id: args.id
                        },
                    });
                }
            });
    }
});
exports.cardMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createCard", {
            type: "Card",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                question: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                answer: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve(parent, args, context) {
                const { id, question, description, answer } = args;
                const newCard = context.prisma.card.create({
                    data: {
                        id,
                        question,
                        description,
                        answer
                    }
                });
                return newCard;
            }
        });
    }
});
