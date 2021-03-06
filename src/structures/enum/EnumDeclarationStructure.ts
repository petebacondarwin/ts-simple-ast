﻿import {NamedNodeStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure} from "./../base";
import {EnumMemberStructure} from "./EnumMemberStructure";

export interface EnumDeclarationStructure
    extends NamedNodeStructure, EnumDeclarationSpecificStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure
{
}

export interface EnumDeclarationSpecificStructure {
    isConst?: boolean;
    members?: EnumMemberStructure[];
}
