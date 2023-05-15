import {ApiOperation, ApiOperationOptions, ApiParamOptions} from "@nestjs/swagger";
import {targetModulesByContainer} from "@nestjs/core/router/router-module";

// method decorator
export const CustomApiOperation = (options?: ApiOperationOptions) => {

    // target: class의 prototype, propertyKey: 해당 method의 key, descriptor: PropertyDescriptor
    return (target: any, propertyKey: string, desccriptor: PropertyDescriptor) => {

        // 왼쪽이 비어있지 않으면, 왼쪽 반환, 왼쪽이 비어있다면 오른쪽 값 반환
        // operationId를 따로 작성해주지 않으면, controller 내의 함수 이름을 반환할 수 있도록 설정하는 decorator
        const operationId = options.operationId || propertyKey;
        ApiOperation({...options, operationId})(target, propertyKey, desccriptor);
    };
};