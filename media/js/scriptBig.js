
//Данные о веществах

var ingredients = [
	['BaCl', 2],
	['H', 2, 'SO', 4],
	['AgNO', 3],
	['HCl'],
	['NaBr'],
	['KI'],
	['AlCl', 3],
	['3NH', 3, '*H', 2, 'O'],
	['CuSO', 4],
	['Na', 2, 'S'],
	['Pb(NO', 3, ')', 2],
	['K', 3, 'PO', 4],
	['Ba(OH)', 2],
	['CrCl', 3],
	['MgSO', 4],
	['NaOH'],
	['FeSO', 4],
	['FeCl', 3]
];
var task = [
	['Ba', '2+'],
	['Ag', '+', ' и Cl','-'],
	['Br', '-'],
	['I', '-'],
	['Al', '3+'],
	['S', '2-'],
	['S', '2-'],
	['PO4', '3-'],
	['Cu', '2+'],
	['Cr', '3+'],
	['Mg', '2+'],
	['Fe', '2+'],
	['Fe', '3+'],
];
var conclusion = [
	['Белый ', "#fff"],
	['Белый творожистый ', '#fff'],
	['Светло-желтый ', '#FFFF63'],
	['Желтый ','#FFFF1C'],
	['Белый ', "#fff"],
	['Черный ', '#000'],
	['Черный ', '#000'],
	['Желтый ', '#FFFF1C'],
	['Голубой ', '#61c3ff'],
	['Светло-зеленый ','#6FF26F' ],
	['Белый ', '#fff'],
	['Серо-зеленый ', '#ACE1AF'],
	['Бурый ', '#7b3801'],
];
var conclusionFormula = [
	['BaSO', 4],
	['AgCl'],
	['AgBr'],
	['AgI'],
	['Al(OH)', 3],
	['CuS'],
	['PbS'],
	['Ag', 3, 'PO', 4],
	['Cu(OH)', 2],
	['Cr(OH)', 3],
	[ 'Mg(OH)', 2],
	['Fe(OH)', 2],
	['Fe(OH)', 3]
];
//Определяет возможность выполнения скрипта по обновлению задания
var checkPoint = false;
//Определяет порядковый номер итерации
var pageId = 1;
var check1;
var check2;

//События

//Выбор нужных веществ (постоянна)
$('.ingredients').click(function () {
	if (($('#elem1').hasClass('full'))&&($('#elem2').hasClass('full'))) {
	}
	else {
		if ( $('#elem1').hasClass('full') ) {
 		$(this).animate({marginLeft:'404', marginTop: '498'}, 400);
 		$(this).addClass('use');
 		$('#elem2').addClass('full');
 		} else {
 		$(this).addClass('use');
 		$(this).animate({marginLeft:'95', marginTop: '498'}, 400);
 		$('#elem1').addClass('full');
 		}
	}
});
//Удаление выбранных веществ (постоянна)
$('#delete').click(function () {
	$('#elem1').removeClass('full');
	$('#elem2').removeClass('full');
	$('.ingredients').removeClass('use');
	$('#a1').animate({marginLeft:'70', marginTop: '50'}, 400);
	$('#a2').animate({marginLeft:'240', marginTop: '50'}, 400);
	$('#a3').animate({marginLeft:'410', marginTop: '50'}, 400);
	$('#a4').animate({marginLeft:'70', marginTop: '170'}, 400);
	$('#a5').animate({marginLeft:'240', marginTop: '170'}, 400);
	$("#sedimentName").children().remove();
	$('#sedimentColor').text('');
	$('#false').hide();
	$('#true').hide();
	$('.equ').hide();
	$('#result').css('border-color', '#5b2e35');
});
//Добавляет ингредиенты (цикл проходит по массиву, отделяя индексы и переводя их в нижний регистр)
function ingLoop (arrayId, number, to) {
	var i = 0;
	while ( i < arrayId[number].length) {
		var part = arrayId[number][i];
		if ( typeof part == "string" ) {
			var text = '<span>' + String(part) + '</span>';
			$(to).append(text);
		}
		else {
			var num = '<sub>' + part + '</sub>';
			$(to).append(num);
		}
	i++;
	};
}
//Полная очистка
function fullReady () {
	$('#elem1').removeClass('full');
	$('#elem2').removeClass('full');
	$('.ingredients').removeClass('use');
	$('#a1').animate({marginLeft:'70', marginTop: '50'}, 400);
	$('#a2').animate({marginLeft:'240', marginTop: '50'}, 400);
	$('#a3').animate({marginLeft:'410', marginTop: '50'}, 400);
	$('#a4').animate({marginLeft:'70', marginTop: '170'}, 400);
	$('#a5').animate({marginLeft:'240', marginTop: '170'}, 400);
	$("#sedimentName").children().remove();
	$('#sedimentColor').text('');
	$('#false').hide();
	$('#true').hide();
	$('.equ').hide();
	$(".ingredients").children().remove();
	$("#onElem").children().remove();
	$('#result').css('border-color', '#5b2e35');
}
//Основная функция генерации контента
// 1. Номер страницы
// 2-6. Идентификаторы ингредиентов в массиве (нумерация с нуля)
// 7-8. Правильные ингредиенты в конкретном задании  (может быть равно только: 1, 2, 3, 4 или 5)
// 9 Порядковый номер осадка в двух массивах (conclusion и conclusionFormula)
function bigLoad(pageId, ingLoop1, ingLoop2, ingLoop3, ingLoop4, ingLoop5, ans1, ans2, resultId) {
	//Задание
	$('#taskNum').text('Задание ' + String(pageId) );
	$('#onElem').append('<span><big>' + task[pageId-1][0] + '</big></span>');
	$('#onElem').append('<sup><big>' + task[pageId-1][1] + '</big></sup>');
	if (pageId == 2) {
		$('#onElem').append('<span><big>' + task[pageId-1][2] + '</big></span>');
		$('#onElem').append('<sup><big>' + task[pageId-1][3] + '</big></sup>');
	}
//Ввод используемых ингредиентов
	ingLoop(ingredients, ingLoop1,'#a1');
	ingLoop(ingredients, ingLoop2,'#a2');
	ingLoop(ingredients, ingLoop3,'#a3');
	ingLoop(ingredients, ingLoop4,'#a4');
	ingLoop(ingredients, ingLoop5,'#a5');
//Проверка правильности ответа
	$('#check').click(function () {
		check1 = $('#a'+ String(ans1)).hasClass('use');
		check2 = $('#a'+ String(ans2)).hasClass('use');
		if (check1 && check2) {
			//Правильный ответ
			checkPoint = true;
			$('#equ'+String(pageId-1)).show(300);
			$('#sedimentColor').text(conclusion[resultId-1][0] + 'осадок');
			ingLoop(conclusionFormula, resultId-1,'#sedimentName');
			$('#result').css('border-color', conclusion[resultId-1][1]);
			// $('#true').css('display', 'inline');
		} else {
			//Неправильный ответ
			$('#sedimentColor').text('Произошла ошибка!');
			$('.equ').hide();
			$('#sedimentName').children().remove();
			$('#result').css('border-color', '#5b2e35');
			// $('#false').css('display', 'inline');
		}
	});
};

window.onload = bigLoad(pageId, 0, 1, 3, 2, 5, 1, 2, pageId);
//Последующие загрузки
$('.nextTask').click(function() {
	//Выполняется если дан верный ответ
	if (checkPoint) {
		checkPoint = false;
		pageId++;
		fullReady();
		if (pageId == 2) {
			bigLoad(pageId, 11, 2, 3, 8, 1, 2, 3, pageId);
			
		}
		else if (pageId == 3) {
			bigLoad(pageId, 14, 15, 4, 2, 1, 3, 4, pageId);
		}
		else if (pageId == 4) {
			bigLoad(pageId, 17, 14, 9, 5, 2, 4, 5, pageId);
		}
		else if (pageId == 5) {
			bigLoad(pageId, 7, 3, 6, 14, 11, 1, 3, pageId);
		}
		else if (pageId == 6) {
			bigLoad(pageId, 7, 8, 12, 9, 13, 2, 4, pageId);
		}
		else if (pageId == 7) {
			bigLoad(pageId, 15, 3, 10, 5, 9, 3, 5, pageId);
		}
		else if (pageId == 8) {
			bigLoad(pageId, 2, 8, 7, 11, 4, 1, 4, pageId);
		}
		else if (pageId == 9) {
			bigLoad(pageId, 11, 8, 17, 2, 12, 2, 5, pageId);
		}
		else if (pageId == 10) {
			bigLoad(pageId, 13, 0, 17, 3, 7, 1, 5, pageId);
		}
		else if (pageId == 11) {
			bigLoad(pageId, 14, 4, 16, 15, 5, 1, 4, pageId);
		}
		else if (pageId == 12) {
			bigLoad(pageId, 5, 16, 1, 15, 4, 2, 4, pageId);
		}
		else if (pageId == 13) {
			bigLoad(pageId, 17, 1, 3, 11, 15, 1, 5, pageId);
			$('.nextTask').css('display','inline-block');
			$('.btn-danger').hide();
		}
	}
});
