export type JobItem = {
	badgeLetters: string;
	company: string;
	title: string;
	daysAgo: number;
	id: number;
	relevanceScore: number;
	date: string;
};

export type JobItemResponse = JobItem & {
	description: string;
	qualifications: string[];
	reviews: string[];
	location: string;
	duration: string;
	salary: string;
	coverImgURL: string;
	companyUrl: string;
};

export type SortBy = "relevant" | "recent";
export type DirectionType = "next" | "previous";
