"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const client_1 = require("@prisma/client");
const constants_1 = require("./constants");
const credit_users_1 = require("./seeds/credit-users");
// initialize Prisma Client
const prisma = new client_1.PrismaClient();
async function main() {
    const basicPlanExists = await prisma.planConfig.findUnique({
        where: {
            id: constants_1.BASIC_PLAN_ID,
        },
    });
    if (!basicPlanExists) {
        await createBasicPlan();
    }
    await (0, credit_users_1.creditInitialBalance)(prisma);
}
// execute the main function
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
});
async function createBasicPlan() {
    // create the basic plan config
    const basicPlan = await prisma.planConfig.create({
        data: {
            id: constants_1.BASIC_PLAN_ID,
            maxQueryCount: constants_1.DEFAULT_MAX_QUERY_COUNT,
            maxTeamCount: constants_1.DEFAULT_MAX_TEAM_COUNT,
            maxTeamMemberCount: constants_1.DEFAULT_MAX_TEAM_MEMBER_COUNT,
            queryRevisionLimit: constants_1.DEFAULT_QUERY_REVISION_LIMIT,
            allowMoreTeamMembers: false,
        },
    });
    console.log({ basicPlan });
}
async function createTeamWorkspaces() {
    const teamsWithoutWorkspace = await prisma.team.findMany({
        where: {
            Workspace: {
                none: {},
            },
        },
    });
    console.log('teams without workspaces', teamsWithoutWorkspace);
    if (teamsWithoutWorkspace.length) {
        const proms = teamsWithoutWorkspace.map(({ id, name, ownerId }) => {
            return prisma.workspace.create({
                data: {
                    name: `${name} Workspace`,
                    ownerId,
                    teamId: id,
                },
            });
        });
        const res = await Promise.all(proms);
        console.log('result', res);
    }
}
//# sourceMappingURL=seed.js.map