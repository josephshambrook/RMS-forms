const data = [
  {
    "category": "3913 - Beer tasting",
    "riskLevel": 1,
    "message": "This is low risk"
  },
  {
    "category": "4501 - Bedding shops",
    "riskLevel": 3,
    "message": "This is prohibited"
  }
];

const risks = [
  {
    "colorClass": "success",
    description: "Low risk",
    level: 1
  },
  {
    "colorClass": "warning",
    "description": "High risk",
    "level": 2
  },
  {
    "colorClass": "danger",
    "description": "Prohibited",
    "level": 3
  }
]

const options = data.map((option, index) => ({ id: index, text: option.category }));

$(function() {
  const descriptionSearch = $('.js-description-search');

  const template = $('.js-business-description-template');
  const templateIcon = template.find('.js-template-risk-icon');
  const templateCategory = template.find('.js-template-category');
  const templateMessage = template.find('.js-template-message');

  descriptionSearch.select2({
    data: options,
    width: '100%'
  });

  descriptionSearch.on('change', function() {
    const chosenOption = data[this.value]

    const risk = risks.find(risk => risk.level === chosenOption.riskLevel);

    templateIcon.text(risk.colorClass);

    // bg-success

  });
});
