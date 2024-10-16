// Определяем начальное состояние
export interface TransferredLeadsState {
	leads: Lead[];
	loading: boolean;
	error: string | null;
	count: number;
	refetch: boolean;
}

export interface FetchTransferredLeadsParams {
	company?: string;
	firstName?: string;
	lastName?: string;
	country?: string;
	status?: ELeadStatus;
	installment?: boolean;
	recipientID?: string;
	limit?: number;
	offset?: number;
}

// Определяем тип возвращаемого значения и параметров
export interface FetchTransferredLeadsResponse {
	leads: Lead[];
	count: number;
}

export enum ELeadStatus {
	LEAD_SENT = 1,
	WORK_IN_PROGRESS = 2,
	CALL_SCHEDULED = 3,
	PROPOSAL_SENT = 4,
	IN_NEGOTIATION = 5,
	CLOSED = 6,
}

// Определяем типы для лида
export interface Lead {
	_id: string;
	sender: string;
	recipient: {
		_id: string;
		firstName: string;
		lastName: string;
		phone: number;
		email: string;
		company: string;
	};
	firstName: string;
	lastName: string;
	phone: string;
	country: string;
	details: string;
	purchaseTimeframe: string;
	budget: string;
	installment: boolean;
	comments: string;
	status: ELeadStatus;
}
