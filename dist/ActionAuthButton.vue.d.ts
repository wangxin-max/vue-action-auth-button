declare namespace _default {
    const name: string;
    namespace props {
        namespace type {
            const type_1: StringConstructor;
            export { type_1 as type };
            export const required: boolean;
            export function validator(value: any): boolean;
        }
        namespace text {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default: string;
            export { _default as default };
        }
        namespace buttonType {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_1: string;
            export { _default_1 as default };
            export function validator_1(value: any): boolean;
            export { validator_1 as validator };
        }
        namespace size {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_2: string;
            export { _default_2 as default };
            export function validator_2(value: any): boolean;
            export { validator_2 as validator };
        }
        namespace icon {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_3: any;
            export { _default_3 as default };
        }
        namespace loading {
            const type_6: BooleanConstructor;
            export { type_6 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace disabled {
            const type_7: BooleanConstructor;
            export { type_7 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace record {
            const type_8: ObjectConstructor;
            export { type_8 as type };
            function _default_6(): {};
            export { _default_6 as default };
            export function validator_3(value: any): boolean;
            export { validator_3 as validator };
        }
        namespace confirmTitle {
            const type_9: StringConstructor;
            export { type_9 as type };
            const _default_7: string;
            export { _default_7 as default };
        }
        namespace buttonStyle {
            const type_10: ObjectConstructor;
            export { type_10 as type };
            function _default_8(): {};
            export { _default_8 as default };
            export function validator_4(value: any): boolean;
            export { validator_4 as validator };
        }
    }
    function data(): {
        hasPermission: boolean;
        checkingPermission: boolean;
        textMap: {
            view: string;
            edit: string;
            add: string;
            delete: string;
            custom: string;
        };
    };
    namespace computed {
        function isTextButton(): boolean;
        function buttonClass(): {
            [x: string]: any;
            'no-permission': boolean;
            disabled: any;
        };
        function currentAction(): any;
        function computedButtonStyle(): any;
    }
    function mounted(): void;
    const watch: {
        type: {
            handler: string;
            immediate: boolean;
        };
        '$store.state.setting.currentPermissionId': {
            handler: string;
            immediate: boolean;
        };
    };
    namespace methods {
        function checkPermission(): void;
        function handleClick(): void;
    }
}
export default _default;
