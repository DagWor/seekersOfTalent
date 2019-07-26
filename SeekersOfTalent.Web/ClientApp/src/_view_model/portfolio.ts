export interface PortfolioViewModel {
    id: number;
    employeeId: string;
    projects: Project[];
}

export interface Project {
    name: string;
    description: string;
    links: string[];
}