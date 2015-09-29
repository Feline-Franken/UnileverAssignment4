
//Retrieving data from database
$('#linkTest').on('click',function(e){
	$('.infotable').empty();
		//Check for reasoning
		var reasoning = $('.reasoning');
		if(reasoning)
			reasoning = 'true';
		else
			reasoning = 'false';
		//our query
		var query = $('#query14').val();
		//Splitting up our query to check for the column names
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

	//the endpoint used to access the database
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


