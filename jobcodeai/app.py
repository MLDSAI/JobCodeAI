from functools import partial

from loguru import logger
from nicegui import ui

from jobcodeai.crud import get_jobs, insert_job


class State:
    job_container = None


state = State()


def add_job(e, add_job_el):
    logger.info(f"{e=}")
    text = add_job_el.value
    logger.info(f"{text=}")
    job = insert_job({"text": text})
    logger.info(f"{job=}")
    # TODO: update non-desctructively
    clear_jobs()
    display_jobs()


def display_jobs():
    jobs = get_jobs()
    with state.job_container:
        # display latest job first
        for job in jobs[::-1]:
            with ui.card() as card:
                ui.markdown(f'#### Job {job.id}')
                ui.label(job.text)


def clear_jobs():
    state.job_container.clear()


def main():
    add_job_el = ui.textarea()
    ui.button("Add Job", on_click=partial(add_job, add_job_el=add_job_el))
    state.job_container = ui.column()
    display_jobs()
    ui.run()



if __name__ in ("__main__", "__mp_main__"):
    main()
