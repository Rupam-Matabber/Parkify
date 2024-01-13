# parkify-ai

TF Alphabet and Classification models(download these if you want to use our trained models) - [here](https://drive.google.com/drive/folders/1Ssj6YzK_dyPvmYKrZKc91CG9-sqqeJzM?usp=sharing)


## requirements
 - python
 - **OPTIONAL -** environment manager(eg -> conda) 

## steps

To use this project, follow these steps:

### clone the repository
```bash
git clone https://github.com/Parkify-Official/parkify-ai.git
```

### Navigate to the project directory
```bash
cd parkify-ai
```

### create a virtual environment
```bash
conda create --name parkify_env python=3.11.3
```

**note -** replace the 3.11.3 with your python version

### activate the virtual environment
```bash
conda activate parkify_env
```

### Install dependencies
```bash
pip install -r requirements.txt
```

### Run the script
```bash
python main_app.py.py
```
**note -** replace the **img_path** in the **get_plate** function argument with the path of the image you have.
you can also replace the **.h5** models and replace the paths of the models with the paths of your trained models.
