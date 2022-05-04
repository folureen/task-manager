import type { TNetworkState } from "common/types/network";

export const NETWORK_STATE: Record<string, TNetworkState> = {
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    RESOLVED: 'RESOLVED'
}