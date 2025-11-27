declare namespace _default {
    const name: string;
    namespace props {
        namespace buttonType {
            const type: StringConstructor;
            const required: boolean;
        }
        namespace text {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default: string;
            export { _default as default };
        }
        namespace record {
            const type_2: ObjectConstructor;
            export { type_2 as type };
            function _default_1(): {};
            export { _default_1 as default };
            export function validator(value: any): boolean;
        }
        namespace icon {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_2: any;
            export { _default_2 as default };
        }
        namespace confirmTitle {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_3: string;
            export { _default_3 as default };
        }
        namespace confirmCallback {
            const type_5: FunctionConstructor;
            export { type_5 as type };
            const _default_4: any;
            export { _default_4 as default };
            export function validator_1(value: any): boolean;
            export { validator_1 as validator };
        }
        namespace buttonStyle {
            const type_6: ObjectConstructor;
            export { type_6 as type };
            function _default_5(): {};
            export { _default_5 as default };
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
            action: string;
            export: string;
            download: string;
            upload: string;
            import: string;
            copy: string;
            print: string;
            refresh: string;
            reset: string;
            submit: string;
            cancel: string;
            approve: string;
            reject: string;
            publish: string;
            archive: string;
            restore: string;
        };
    };
    namespace computed {
        function style(): any;
        function disabled(): any;
        function currentAction(): any;
        function needConfirm(): boolean;
        function buttonComponentClass(): {
            'no-permission': boolean;
        };
    }
    function mounted(): void;
    const watch: {
        buttonType: {
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
        function validateCallbackUsage(): void;
        function handleConfirm(): void;
        function handleClick(): void;
    }
}
export default _default;
