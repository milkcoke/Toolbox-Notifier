export interface IGitHubHandler {
    getLatestReleaseID(): Promise<number>
    getNumOfDownload(releaseId: number): Promise<any>
}