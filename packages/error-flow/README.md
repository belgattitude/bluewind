# @bluewind/error-flow

Experiment ;)

## Result class

### Imperative usage

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

// payload is now narrowed to ok result.
console.log(payload.value);
```

