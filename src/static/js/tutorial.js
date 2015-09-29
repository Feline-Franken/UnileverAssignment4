
//Retrieving data from database met inferencing
$('#linkTest').on('click',function(e){
	$('.infotable').empty();

		var reasoning = $('.reasoning');
		if(reasoning)
			reasoning = 'true';
		else
			reasoning = 'false';
		//our query
		var query = $('#query14').val();
		//the endpoint used to access the database
		var q = query.split('WHERE');
		q = q[1].split('?');
		console.log(query);
		console.log(q);
		var i = 0;
		var names = [];
		$.each(q, function(index, value){
			if(i > 0){
				var name = value.split(' ');
				if(name[0].indexOf('}') !== -1)
					name[0] = name[0].replace('}','');
				names.push(name[0]);
			}
			i++;
		});
/*
*/


		var endpoint = 'http://localhost:5820/test/query';
		//we want a JSON back
		var format = 'JSON';
				//sending a get request to retrieve the data
				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(data){
					//creating a table
					var tHead = '<tr>';
					$.each(names, function(index,value){
						tHead += '<th>' + value + '</th>';
					});
					tHead += '</tr>';
					
					var tBody = '';
					//Looping through the retrieved data and adding a row for each object
					$.each(data.results.bindings, function(index,value){
						$.each(value, function(index,val){
							tBody += '<td>'+val.value+'</td>';	
						})
						tBody += '</tr>';
						
					});
					//combining the table head and the table body
					var el = '<table border="1" style="width:100%">'+tHead+tBody+'</table>';
					//adding the table to the html
					$('.infotable').html(el);
				});
	});

	//Retrieving data from database without inferencing
// $('#linkgras').on('click',function(e){
// 	console.log('forogal');
// 		//our query
// 		var query = $('#querygras').val();
// 		//the endpoint used to access the database
// 		var endpoint = 'http://localhost:5820/test/query';
// 		//we want a JSON back
// 		var format = 'JSON';
// 				//sending a get request to retrieve the data
// 				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': 'false'}, function(data){
// 					//creating a table
// 					var tHead = '<tr><th>Product</th><th>Branch</th></tr>';
// 					var tBody = '';
// 					//Looping through the retrieved data and adding a row for each object
// 					$.each(data, function(index,value){
// 						tBody += '<tr><td>'+value.Product+'</td><td>'+value.Branch+'</td></tr>';
// 					});
// 					//combining the table head and the table body
// 					var $el = '<table border="1" style="width:100%">'+tHead+tBody+'</table>';
// 					//adding the table to the html
// 					$('.infotable2').html($el);
// 					console.log('lolollol');
// 				});
// 	});


