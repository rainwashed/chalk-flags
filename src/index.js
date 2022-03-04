import chalk from "chalk"

class ChalkFlag {
    constructor(verboseLogging=false, customSplitRule=" ", customDeclaration="/") {
        this.verboseLogging = verboseLogging;
        this.customSplitRule = customSplitRule;
        this.customDeclaration = customDeclaration;
        this._lexerTrackingSystem = {};
        this._functionReference = {
            // TODO: Insert all function refrences
        }
    }

    // Calculate the amount of flags in a string for flag-stringing
    calculateFlagCount(phrase) {

    }

    parse(string) {

    }
}