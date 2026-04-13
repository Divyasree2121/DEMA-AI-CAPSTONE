# Research Paper: DermAI: An EfficientNetB0-Based Model for Skin Condition Classification

## Paper Details

**Proceedings of the 6th International Conference on Image Processing and Capsule Networks (ICIPCN-2026)**
- DVD Part Number: CFP26VY4-DVD
- ISBN: 979-8-3315-9980-5
- Conference Date: January 27-29, 2026
- Conference Location: Kathmandu, Nepal (Kathmandu University, Dhulikhel)

## Authors

1. **Dr. Vignesh K** (Guide) - Associate Professor, Dept. of Computer Science and Engineering, KARE
2. **Dr. B. Baranitharan** - Associate Professor, Dept. of Civil Engineering, KARE
3. **Divya Sree S** - B.Tech CSE, KARE (divyasreenika@gmail.com)
4. **Roopamalini R** - B.Tech CSE, KARE (rooparoopa8231@gmail.com)
5. **Jaya Shree K** - B.Tech CSE, KARE (jayashree2005lx@gmail.com)
6. **Guyana K** - B.Tech CSE, KARE (gayanakannan@gmail.com)

## Abstract

Skin-related diseases are among the most prevalent health issues worldwide. This research proposes **DermAI**, a lightweight and effective skin condition classification framework that addresses the challenges of traditional dermatologist diagnosis.

### Key Contributions

- Embeds transfer learning with pre-trained ImageNet weights
- Evaluates six convolutional network variants (3 ResNet, 3 EfficientNet)
- Trains on a carefully prepared dermatoscopic image dataset representing 10 skin conditions
- Applies multiple preprocessing techniques for normalization and augmentation

### Results

**EfficientNet Performance:**
- Accuracy: ~89%
- Precision: ~87%
- Recall: 86%
- **Outperforms best ResNet model by ~4%**

### Keywords

Healthcare, well-being, health education, vulnerable population, illness, equal access

## Methodology

### Dataset
- **Source**: Kaggle Skin Diseases Image Dataset
- **Total Images**: 27,153 dermatoscopic images
- **Classes**: 10 different skin conditions
- **Data Split**:
  - Training: 16,292 images
  - Validation: 10,861 images
  - Testing: 10,861 images

### Preprocessing Techniques

1. **Image Resizing**: 224×224 pixels
2. **Normalization**: Pixel values scaled to [0,1] range
3. **Data Augmentation**: 
   - Horizontal/vertical flips
   - Brightness adjustments
   - Contrast adjustments
   - Random rotations
4. **Circle Crop**: Elimination of background artifacts
5. **Unsharp Mask**: Edge sharpening for boundary clarity
6. **CLAHE**: Contrast Limited Adaptive Histogram Equalization
7. **Class Balancing**: Weighted sampling for underrepresented classes

### Model Architecture

**EfficientNetB0**:
- Compound scaling of depth, width, and resolution
- Pre-trained ImageNet weights
- Frozen backbone + fine-tuned dense layers
- Output: 10-class softmax classification

**Training Setup**:
- Optimizer: Adam with scheduled learning rate
- Loss Function: Categorical Cross-Entropy
- Batch Size: 32
- Epochs: 10-15 with early stopping
- Regularization: Dropout and Batch Normalization

## Skin Disease Classes

1. **Eczema** - Chronic inflammatory skin disease
2. **Warts** - Non-cancerous HPV-related growths
3. **Melanoma** - Aggressive malignant skin cancer
4. **Atopic Dermatitis** - Chronic inflammatory condition
5. **Basal Cell Carcinoma (BCC)** - Most common cutaneous malignancy
6. **Melanocytic Nevus** - Benign melanocyte proliferation
7. **Benign Lesion** - Non-malignant skin conditions
8. **Psoriasis** - Chronic immune-mediated disease
9. **Seborrheic Keratosis** - Benign epidermal tumor
10. **Tinea (Dermatophytosis)** - Superficial fungal infection

## Performance Metrics

### Overall Accuracy: 81%

### Class-wise Performance (Sample):

| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| Melanoma | 0.99 | 0.90 | 0.94 |
| Melanocytic Nevi | - | - | - |
| Basal Cell Carcinoma | - | - | - |
| Atopic Dermatitis | 0.53 | 0.55 | 0.54 |
| Eczema | - | - | - |
| Psoriasis | - | - | - |

**Training Accuracy**: 81.39%
**Validation Accuracy**: 81.12%

## Conclusions

- CNN-based models can achieve near-dermatologist accuracy
- EfficientNet offers better balance of accuracy and efficiency than ResNet
- Model shows strong potential for teledermatology platforms
- Improved accessibility to dermatological services in rural areas
- Cost-effective diagnostic assistance

## Limitations

1. Dataset bias
2. Insufficient diversity across skin tones
3. Need for larger, varied image collections
4. Misclassifications between visually similar diseases

## Future Directions

1. Expand datasets with diverse skin tones and global representation
2. Combine multiple image modalities (dermoscopy, clinical, histopathology)
3. Develop justifiable AI models with explainability
4. Create mobile technology tools for rural screening
5. Apply federated learning for privacy-preserving updates

## Conference Details

- **Paper ID**: ICIPCN-1135
- **Status**: Accepted for presentation
- **Conference Chain**: IEEE, ICIPCN, Computational Intelligence Society
- **Publication**: IEEE Conference Publishing Services
