import {Result} from "../src";

type UserData = {
    username: string;
}

const {payload } = Result.ok<UserData>({username: 'John'});

if (payload.isError) {
    throw payload.error;
}

console.log(payload.value.username);

type Test = { user: string, user2: string, user3: string, user4: string, user5: string, user6: string,user7: string, user8: string,   }
