import pytest
from jobcodeai import ipynb_runner

def test_ipynb_files():
    assert ipynb_runner.run() == True, "The ipynb files did not run successfully"

if __name__ == "__main__":
    pytest.main()