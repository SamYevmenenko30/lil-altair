"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditInitialBalance = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
const creditInitialBalance = async (prisma) => {
    // for all users without a credit balance, create a credit balance record with INITIAL_CREDIT_BALANCE credits each,
    // and create a credit transaction record for the initial credits
    const users = await prisma.user.findMany({
        where: {
            CreditBalance: {
                is: null,
            },
        },
    });
    const creditBalanceRecords = users.map(async (user) => {
        await prisma.creditBalance.create({
            data: {
                fixedCredits: constants_1.INITIAL_CREDIT_BALANCE,
                monthlyCredits: 0,
                userId: user.id,
            },
        });
        await prisma.creditTransaction.create({
            data: {
                userId: user.id,
                fixedAmount: constants_1.INITIAL_CREDIT_BALANCE,
                monthlyAmount: 0,
                type: client_1.CreditTransactionType.INITIAL,
                description: 'Initial credits',
            },
        });
    });
    await Promise.all(creditBalanceRecords);
    console.log('Credit initial balance seed completed');
};
exports.creditInitialBalance = creditInitialBalance;
//# sourceMappingURL=credit-users.js.map