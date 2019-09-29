# @bluewind/error-flow

Experiment for a slightly more enforcing error flow / Waiting for typescript 3.7 assert
to get something cool with this.

- [x] Handle error prior to use value (enforced through discriminated unions)
- [x] Works with promise / async
- [x] map/flat map for functional approach
 
## Usage

### Imperative approach

```typescript
import { Result } from '@bluewind/error-flow';

type UserData = {
  username: string,
  email?: string,
}

const getFailableData = (): Result<UserData> => {
    return (Math.random() > 0.5) 
        ? Result.ok({username: 'John'})    
        : Result.fail(new Error(`An error occured`));

}

// get the payload
const {payload} = getFailableData();

if (payload.isError) {
    throw payload.error;
}

// payload is now narrowed to ok result: <UserData>.
console.log(payload.value);
```

### Functional approach
