/*
 * This file is part of the Agent Banking module.
 *
 * Copyright (c) 2019-2022, BRAC IT SERVICES LIMITED <http://www.bracits.com>
 */

import {lpad} from "@bracit/common-utils";
declare const moment;

export function parseDdMmYyyyToDate(ddMmYyyy: string, separator: string): Date | null {
    try {
        if (!ddMmYyyy) {
            return null;
        }
        if (ddMmYyyy.indexOf(separator) === -1) {
            return null;
        }

        const fields: string[] = ddMmYyyy.split(separator);
        if (fields.length !== 3) {
            return null;
        }
        return new Date(Number(fields[2]), Number(fields[1]) - 1, Number(fields[0]));
    } catch (e) {
        return null;
    }
}

export function serializeDateToDdMmYyyy(date: Date, separator: string): string | null {
    if (!date) {
        return null;
    }
    return date.getFullYear() + separator + lpad(date.getMonth() + 1, 2) + separator + lpad(date.getDate(), 2);
}

export function formatTimestamp(timestamp: number, format: string): string {
    return moment.unix(timestamp).format(format);
}
export function timestampToDateAtMidnight(timestamp: number): Date {
    const dateParts = moment.unix(timestamp).format('YYYY M D').split(' ');

    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
}
