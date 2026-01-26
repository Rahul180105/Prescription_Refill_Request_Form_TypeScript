import { state } from "../../../states/app-state";

export function clearErrors():void{
    state.errors={};
}