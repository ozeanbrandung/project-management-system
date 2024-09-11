class DASHBOARD {
    //domain:3000/tasks !== domain:3000/dash/tasks
    // /dash - private pages
    private root = '/dash'

    HOME = this.root
    TASKS = `${this.root}/tasks`
    HABITS = `${this.root}/habits`
    TIMER = `${this.root}/timer`
    TIME_BLOCKING = `${this.root}/time-blocking`
    SETTINGS = `${this.root}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()