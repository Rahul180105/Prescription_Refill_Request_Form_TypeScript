import { state } from "../../app.state";

export function clearErrors():void{
    state.errors={};
}